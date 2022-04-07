import { ExperimentalGetTinaClient } from "../../.tina/__generated__/types";
import { Layout } from "../../components/layout";
import { Post } from "../../components/post";
import { useTina } from "tinacms/dist/edit-state";

// Use the props returned by get static props
export default function BlogPostPage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  if (data && data.getPostsDocument) {
    return (
      <Layout rawData={data} data={data.getGlobalDocument.data}>
        <Post {...data.getPostsDocument} />;
      </Layout>
    );
  }
  return (
    <Layout>
      <div>No data</div>;
    </Layout>
  );
}

export const getStaticProps = async ({ params, locale }) => {
  const client = ExperimentalGetTinaClient();
  const tinaProps = await client.BlogPostQuery({
    relativePath: `${params.filename}.${locale}.mdx`,
  });
  return {
    props: {
      ...tinaProps,
    },
  };
};

/**
 * To build the blog post pages we just iterate through the list of
 * posts and provide their "filename" as part of the URL path
 *
 * So a blog post at "content/posts/hello.md" would
 * be viewable at http://localhost:3000/posts/hello
 */
export const getStaticPaths = async ({ locales }) => {
  const client = ExperimentalGetTinaClient();
  const postsListData = await client.getPostsList();
  const paths = [];

  postsListData.data.getPostsList.edges.map((post) => {
    locales.map((locale) => {
      paths.push({
        params: { filename: post.node.sys.filename },
        locale,
      });
    });
  });

  return {
    paths,
    fallback: true,
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
