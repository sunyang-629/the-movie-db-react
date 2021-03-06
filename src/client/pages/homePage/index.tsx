import * as React from 'react';
import { RefObject } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMovies, loadNextPage } from '../../actions/movies';
import Card from '../../components/card';
import ErrorMessage from '../../components/errorMessage';
import Header from '../../components/homePage/header';
import NoResults from '../../components/homePage/noResults';
import noImageAvailable from '../../components/images/noImageAvailable.png';
import Loader from '../../components/loader';
import LoadMore from '../../components/loadMore';
import ScrollToTop from '../../components/scrollToTop';
import {
    IHomePageDispatchProps,
    IHomePageProps,
    IHomePageStateProps,
} from '../../interfaces/pages/homePage';
import { IMoviesState } from '../../interfaces/store';
import {
    getFormattedReleaseDate,
    getImageUrl,
} from '../../utils/movieInfoHelper';
import { BACKGROUND_COLOR } from '../../../common/constants/theme';
import {
    HomePageWrapper,
    MainSectionWrapper,
} from './style';

const mapStateToProps = ({ movies }: { movies: IMoviesState}): IHomePageStateProps => ({
    error: movies.error,
    isFetching: movies.isFetching,
    isLoadingMore: movies.isLoadingMore,
    movies: movies.movies,
    searchFor: movies.searchFor,
    totalResults: movies.totalResults,
});

const mapDispatchToProps = (dispatch): IHomePageDispatchProps => ({
    getPopularMovies: () => dispatch(getMovies()),
    loadMore: () => dispatch(loadNextPage()),
});

class HomePage extends React.Component<IHomePageProps> {
    private containerRef: RefObject<HTMLDivElement>;

    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
    }

    componentDidMount() {
        if (this.props.movies && this.props.movies.length < 1) {
            this.props.getPopularMovies();
        }
    }

    render() {
        const {
            error,
            isFetching,
            isLoadingMore,
            loadMore,
            movies,
            searchFor,
            totalResults,
        } = this.props;

        const isShowingNoResults = !movies || (totalResults === 0 && searchFor);

        return (
            <HomePageWrapper ref={this.containerRef}>
                <ScrollToTop activeOn={250} />
                <Header />
                <MainSectionWrapper>
                    <Loader active={isFetching && !isLoadingMore} />
                    <h1>{searchFor ? 'Search Result' : 'Popular Movies'}</h1>
                    {movies && movies.map(movie => (
                        <Card
                            key={movie.id}
                            linkUrl={`/movie/${movie.id}`}
                            posterUrl={getImageUrl(movie.poster_path, 200, noImageAvailable)}
                            releaseDate={getFormattedReleaseDate(movie.release_date)}
                            title={movie.title}
                            voteAverage={movie.vote_average * 10}
                        />
                    ))}
                    {isShowingNoResults ? <NoResults /> : null}
                    {error ? <ErrorMessage /> : null}
                </MainSectionWrapper>
                <LoadMore
                    bgcolor={BACKGROUND_COLOR}
                    containerRef={this.containerRef}
                    enableLoader={movies && totalResults > movies.length}
                    handleLoadMore={loadMore}
                    showLoader={isFetching && isLoadingMore}
                />
            </HomePageWrapper>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
