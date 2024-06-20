import { Code, Container, Heading, Text, Spinner } from '@chakra-ui/react';

import { ReactNode } from 'react';

type PageRendererProps = {
  children: ReactNode;
  emptyState?: string;
  error?: Error;
  loading: boolean;
};

type Page = {
  title: string;
} & PageRendererProps;

function PageRenderer({
  children,
  emptyState,
  error,
  loading,
}: PageRendererProps) {
  if (error) {
    return <Code>{error.message}</Code>;
  }

  if (loading) {
    return <Spinner />;
  }

  if (emptyState) {
    return <Text size='xl'>{emptyState}</Text>;
  }

  return children;
}

export default function Page({
  children,
  error,
  emptyState,
  loading,
  title,
}: Page) {
  return (
    <Container>
      <Heading mb={4}>{title}</Heading>

      <PageRenderer error={error} loading={loading} emptyState={emptyState}>
        {children}
      </PageRenderer>
    </Container>
  );
}
