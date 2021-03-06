# !/usr/bin/env python3

import pandas as pd
import requests as req
import datetime as dt
import json
import pygsheets as pyg
import os


# api pull and kinda format into dict
def pull_me_off(api_url):
    response = req.get(url=api_url)
    json_resp = response.json()
    list_of_json = json_resp.get('data')
    return list_of_json


# gsheet upload func
def gloader(title: str, df, auth_path, wb_url):
    client = pyg.authorize(service_account_file=auth_path)
    wb = client.open_by_url(wb_url)
    sheet = wb.worksheet('title', title)
    sheet.clear(start='a1', end=None)
    sheet.set_dataframe(df, 'a1')


def main():

    # todays date
    today = dt.datetime.today()

    # get start_date and end_date
    """ end_date = today.strftime('%Y-%m-%d')
    delta = dt.timedelta(days=3)
    yesterday = today - delta
    start_date = yesterday.strftime('%Y-%m-%d') """

    end_date = '2020-09-09'
    start_date = '2020-09-09'

    # gsheet, auth path
    # workbook = 'https://docs.google.com/spreadsheets/d/1DedqHvnHGBDcyFpJb-fUmF--0atusWqvJbY8LbWa9sU/edit?usp=sharing'
    # auth_file = '/home/jsattari/gsheets_key.json'
    # auth_file = '/Users/johnsattari/stat_tracker/gsheets_key.json'

    # api link
    stats_api = f'https://www.balldontlie.io/api/v1/stats?start_date={start_date}&end_date={end_date}'

    # make api call
    stats_parsed = pull_me_off(stats_api)

    # make get
    #response = req.get(url=stats_api)

    # call response as json
    #json_resp = response.json()

    #stats_parsed = json_resp.get('data')

    # empty dataframe
    bball_data = pd.DataFrame()

    # loop through data, normalize and insert into df
    for i in range(0, len(stats_parsed)):
        norm_json = pd.json_normalize(stats_parsed[i])
        norm_json.drop(columns=['player.height_feet', 'player.height_inches', 'player.position', 'player.team_id', 'player.weight_pounds', 'team.id', 'team.abbreviation', 'team.city',
                                'team.conference', 'team.division', 'team.full_name', 'team.name', 'game.date', 'game.home_team_id', 'game.season', 'game.time', 'game.visitor_team_id', 'game.postseason'], inplace=True)
        bball_data = bball_data.append(norm_json)

    # add adv data columns
    bball_data['ts%'] = bball_data['pts'] / \
        (2 * (bball_data['fga'] + .44 * bball_data['fta']))

    # remove NaNs
    bball_data['ts%'] = bball_data['ts%'].astype(
        str).apply(lambda x: x.replace('nan', ''))

    # combine player names
    bball_data['player'] = bball_data['player.first_name'] + \
        ' ' + bball_data['player.last_name']
    bball_data.drop(labels=['player.first_name',
                            'player.last_name'], axis=1, inplace=True)

    # load data to gsheet using function
    bball_data.to_csv(os.getcwd() +
                      '/data/gameday_data.csv', index=False)

    # get season avgs
    player_id_list = bball_data['player.id'].to_list()

    # api call for szn avgs
    avgs_api = 'https://www.balldontlie.io/api/v1/season_averages?season=2019'

    # add player ID strings to api call
    for i in player_id_list:
        avgs_api = avgs_api + f'&player_ids[]={i}'

    # pull data from avgs api
    szn_avgs = pull_me_off(avgs_api)

    # player id/name dict
    names = dict(zip(bball_data['player.id'], bball_data['player']))

    # loop through data to parse it
    df_avgs = pd.json_normalize(szn_avgs)

    # map player name
    df_avgs['player'] = df_avgs['player_id'].astype(
        str).apply(lambda x: names.get(x))

    # load to gsheets
    df_avgs.to_csv(os.getcwd() +
                   '/data/szn_averages.csv', index=False)

    # api link for games
    games_api = 'https://www.balldontlie.io/api/v1/games?start_date=2020-08-09&end_date=2020-09-09'

    # execute api call
    games = pull_me_off(games_api)

    # new df to house games data
    df_games = pd.DataFrame(
        columns=['home', 'away', 'home_score', 'away_score', 'qtr', 'time', 'status'])

    # loop through games api call to assign data to df_games
    for x in range(0, len(games)):
        test_dict = games[x]
        y = {}
        y['home'] = test_dict.get('home_team').get('name')
        y['away'] = test_dict.get('visitor_team').get('name')
        y['home_score'] = test_dict.get('home_team_score')
        y['away_score'] = test_dict.get('visitor_team_score')
        y['qtr'] = test_dict.get('period')
        y['time'] = test_dict.get('time') if test_dict.get(
            'time') is not '' else 'End'
        y['status'] = test_dict.get('status')
        df_test = pd.DataFrame([y])
        df_games = df_games.append(df_test)

    df_games.to_csv(os.getcwd() +
                    '/data/games.csv', index=False)

if __name__ == "__main__":
    main()
