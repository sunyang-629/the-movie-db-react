import { getYear } from 'date-fns';
import * as React from 'react';
import { memo } from 'react';
import { Image } from 'semantic-ui-react';
import noImageAvailable from '../../images/noImageAvailable.png';
import {
    IMainSectionProps,
} from '../../../interfaces/components/detailsPage/mainSection';
import { getFormattedTime, getImageUrl } from '../../../utils/movieInfoHelper';
import {
    ImageWrapper,
    Info,
    MainSectionWrapper,
    OverviewWrapper,
    Separator,
} from './style';

const MainSection: React.FunctionComponent<IMainSectionProps> = (props) => {
    const {
        overview,
        posterPath,
        releaseDate,
        runtime,
        title,
        voteAverage,
    } = props;

    return (
        <MainSectionWrapper>
            <ImageWrapper>
                <div>
                    <Image
                        fluid
                        src={getImageUrl(posterPath, 300, noImageAvailable)}
                    />
                </div>
            </ImageWrapper>
            <Info>
                <h1>{title}</h1>
                <p>
                    {getYear(new Date(releaseDate))}
                    <Separator>·</Separator>
                    {`${voteAverage * 10}% User Score`}
                </p>
                <p>
                    {getFormattedTime(runtime)}
                </p>
            </Info>
            <OverviewWrapper>
                <h2>Overview</h2>
                <p>{overview || 'No Overview Available'}</p>
            </OverviewWrapper>
        </MainSectionWrapper>
    );
};

export default memo(MainSection);
