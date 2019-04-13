import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { getMovieDetail } from '../../actions/details';
import BackButton from '../../components/backButton';
import MainSection from '../../components/detailsPage/mainSection';
import noImageAvailable from '../../components/images/noImageAvailable.png';
import Loader from '../../components/loader';
import {
    IDetailsDispatchProps,
    IDetailsProps,
    IDetailsStateProps,
} from '../../interfaces/pages/details';
import { IState } from '../../interfaces/store';
import { DetailPageWrapper, Header } from './style';

const mapStateToProps = (state: IState): IDetailsStateProps => ({
    backdropPath: state.details.backdropPath,
    isFetching: state.details.isFetching,
    overview: state.details.overview,
    posterPath: state.details.posterPath,
    releaseDate: state.details.releaseDate,
    runtime: state.details.runtime,
    title: state.details.title,
    voteAverage: state.details.voteAverage,
});

const mapDispatchToProps = (dispatch): IDetailsDispatchProps => ({
    load: id => dispatch(getMovieDetail(id)),
});

class DetailsPage extends React.Component<IDetailsProps> {
    componentDidMount() {
        this.props.load(this.props.match.params.id);
    }

    render() {
        const {
            backdropPath,
            isFetching,
            overview,
            posterPath,
            releaseDate,
            runtime,
            title,
            voteAverage,
        } = this.props;

        const mainSection = (
            <MainSection
                overview={overview}
                posterPath={posterPath}
                releaseDate={releaseDate}
                runtime={runtime}
                title={title}
                voteAverage={voteAverage}
            />
        );

        const pageContent = (
            <DetailPageWrapper>
                <BackButton />
                <Header
                    backdropPath={backdropPath}
                    fallbackImage={noImageAvailable}
                />
                <Container>
                    {mainSection}
                </Container>
            </DetailPageWrapper>
        );

        return isFetching ? <Loader active /> : pageContent;
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailsPage));
