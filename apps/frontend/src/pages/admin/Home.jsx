import Shortner from '../../components/Shortner';
import { useShortners } from '../../hooks/useShortners';
import Page from '../../components/Page';

const HomeAdmin = () => {
  const {
    error,
    isLoading,
    data: response = {
      items: [],
      page: 1,
      pageSize: 20,
      totalCount: 0,
    },
  } = useShortners();

  const { items: shortners, totalCount } = response;

  return (
    <Page
      error={error}
      loading={isLoading}
      emptyState={totalCount === 0 && 'No shortners yet...'}
      title='Shortners'
    >
      {shortners.map((shortner, index) => (
        <Shortner {...shortner} key={index} />
      ))}
    </Page>
  );
};

export default HomeAdmin;
