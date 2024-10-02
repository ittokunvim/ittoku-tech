import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import "./hljs.css";
import "./rlc.css";
import { fetchDocsJson, getDocData } from "../lib";
import styles from "./page.module.css";

export const dynamic = "auto";
export const dynamicParams = false;

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const docData = await getDocData(slug);

  if (docData === undefined) {
    return {}
  }

  return {
    title: docData.title,
  };
}

export async function generateStaticParams() {
  const docs = await fetchDocsJson();

  return docs.map((doc) => ({
    slug: doc.slug,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const docData = await getDocData(slug);

  if (docData=== undefined) {
    return notFound();
  }

  return (
    <main className={styles.main}>
      <article className={styles.docs}>
        <div className={styles.title}>{docData.title}</div>
        <div className={styles.createdAt}>
          <FontAwesomeIcon icon={faClock} />
          {docData.createdAt}
        </div>
        <div className={styles.content_html} dangerouslySetInnerHTML={{ __html: docData.contentHtml }} />
      </article>
    </main>
  );
}
