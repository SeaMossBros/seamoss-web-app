import { Paper, Text, Title, Button } from '@mantine/core';
import './BlogCard.css';

export function BlogCard() {
  return (
    <Paper shadow="md" p="xl" radius="md" className={'card'}>
      <div>
        <Text className={'category'} size="xs">
          nature
        </Text>
        <Title order={3} className={'title'}>
          Best forests to visit in North America
        </Title>
      </div>
      <Button variant="white" color="dark">
        Read Blog
      </Button>
    </Paper>
  );
}