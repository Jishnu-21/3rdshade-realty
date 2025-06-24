import PropertyDetailsClient from './PropertyDetailsClient';

type Props = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function Page({ params }: Props) {
  return <PropertyDetailsClient slug={params.slug} />;
}