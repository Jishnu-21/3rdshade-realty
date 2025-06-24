import { use } from "react";
import PropertyDetailsClient from './PropertyDetailsClient';

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  return <PropertyDetailsClient slug={slug} />;
}