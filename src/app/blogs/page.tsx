import BlogsList from '@/components/Blog/BlogsList';
import { Container, Grid, GridCol } from '@mantine/core';

const BlogsPage: React.FC = () => {
    return (
        <Container>
            <Grid>
                <GridCol span={12}>
                    <BlogsList />
                </GridCol>
            </Grid>
        </Container>
    );
};

export default BlogsPage;
