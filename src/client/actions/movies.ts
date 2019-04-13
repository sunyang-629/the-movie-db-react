import {
    IAction,
    IGetMoviesResponse,
} from '../interfaces/actions';
import fetch from '../../common/utils/fetch';

// action types

export const GET_MOVIES = 'GET_MOVIES';
export const RECEIVE_MOVIES = 'RECEIVE_MOVIES';

// action creators

export function getMoviesAction(): IAction {
    return { type: GET_MOVIES };
}

export function receiveMoviesAction(response: IGetMoviesResponse): IAction {
    return {
        movies: response.results,
        page: response.page,
        totalPages: response.total_pages,
        totalResults: response.total_results,
        type: RECEIVE_MOVIES,
    };
}

// async actions

export function getMovies(pageNumber: number = 1) {
    return (dispatch, getState) => {
        const path = '/movie/popular';
        const queryParameter = `?page=${pageNumber}`;
        const url = `/api${path}${queryParameter}`;

        dispatch(getMoviesAction());

        return fetch(url)
            .then((response: IGetMoviesResponse) => (
                dispatch(receiveMoviesAction(response))
            ))
            .catch((err) => {
                // TODO: handle error
            });
    };
}