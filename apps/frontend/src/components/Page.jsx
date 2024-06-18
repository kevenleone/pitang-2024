import { Code, Container, Heading, Text, Spinner } from '@chakra-ui/react';

function PageRenderer({ children, emptyState, error, loading }) {
  if (error) {
    return <Code>{error}</Code>;
  }

  if (loading) {
    return <Spinner />;
  }

  if (emptyState) {
    return <Text size='xl'>{emptyState}</Text>;
  }

  return children;
}

export default function Page({ children, error, emptyState, loading, title }) {
  return (
    <Container>
      <Heading mb={4}>{title}</Heading>

      <PageRenderer error={error} loading={loading} emptyState={emptyState}>
        {children}
      </PageRenderer>
    </Container>
  );
}
