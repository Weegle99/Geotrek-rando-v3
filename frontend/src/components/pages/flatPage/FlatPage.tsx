import { Layout } from 'components/Layout/Layout';
import Loader from 'react-loader';
import { colorPalette, getSpacing, sizes, zIndex } from 'stylesheet';
import parse from 'html-react-parser';
import styled from 'styled-components';
import { Separator } from 'components/Separator';
import { useFlatPage } from './useFlatPage';
import { DetailsSection } from '../details/components/DetailsSection';
import { ErrorFallback } from '../search/components/ErrorFallback';
import { DetailsSource } from '../details/components/DetailsSource';
import { HtmlText } from '../details/utils';

interface FlatPageUIProps {
  flatPageUrl: string | string[] | undefined;
}

export const FlatPageUI: React.FC<FlatPageUIProps> = ({ flatPageUrl }) => {
  const { flatPage, isLoading, refetch } = useFlatPage(flatPageUrl);
  return (
    <Layout>
      {flatPage === undefined ? (
        isLoading === true ? (
          <Loader
            loaded={!isLoading}
            options={{
              top: `${sizes.desktopHeader + sizes.filterBar}px`,
              color: colorPalette.primary1,
              zIndex: zIndex.loader,
            }}
          />
        ) : (
          <ErrorFallback refetch={refetch} />
        )
      ) : (
        <div className="px-10vw pb-10vw">
          <div className="flex justify-center py-6 desktop:py-12">
            <p className="text-Mobile-H1 desktop:text-H1 font-bold text-primary1">
              {flatPage.title}
            </p>
          </div>
          {flatPage.content !== null && flatPage.content.length > 0 && (
            <>
              <div className="mb-6 desktop:mb-12">
                <FlatPageHtmlText>{parse(flatPage.content)}</FlatPageHtmlText>
              </div>
              <Separator />
            </>
          )}
          {flatPage.sources.length > 0 && (
            <DetailsSection titleId="details.source">
              <div>
                {flatPage.sources.map((source, i) => (
                  <DetailsSource
                    key={i}
                    name={source.name}
                    website={source.website}
                    pictogramUri={source.pictogramUri}
                  />
                ))}
              </div>
            </DetailsSection>
          )}
        </div>
      )}
    </Layout>
  );
};

const FlatPageHtmlText = styled(HtmlText)`
  padding-bottom: ${getSpacing(12)};
`;