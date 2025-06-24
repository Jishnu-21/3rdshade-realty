import PropertyDetailsClient from './PropertyDetailsClient';

export default function Page({ params }: { params: { slug: string } }) {
  return <PropertyDetailsClient slug={params.slug} />;
}