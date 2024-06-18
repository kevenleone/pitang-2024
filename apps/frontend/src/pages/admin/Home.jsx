import Shortner from '../../components/Shortner';
import useShortners from '../../hooks/useShortners';
import Page from '../../components/Page';

const HomeAdmin = () => {
  const {
    error,
    loading,
    response: { items: shortners, totalCount },
  } = useShortners();

  return (
    <Page
      error={error}
      loading={loading}
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
