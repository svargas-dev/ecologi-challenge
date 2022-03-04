import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { getCurrentTimestamp } from '@/utils/date';
import { processTreeData } from '@/data/treeDataApi';

// import BarChart from '@/components/BarChart';
import BasicBarChart from '@/components/BasicBarChart/BasicBarChart';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [treeData, setTreeData] = useState<[number, number][]>();

  // we'll fetch client side here
  useEffect(() => {
    // use a stale-while-revalidate approach https://datatracker.ietf.org/doc/html/rfc5861
    const localData = localStorage.getItem('treeData');
    if (localData && JSON.parse(localData).data) {
      setTreeData(JSON.parse(localData).data);
    }

    (async () => {
      // check our data is stale to avoid hammering endpoint
      const HOUR = 60 * 60;
      if (!localData || getCurrentTimestamp() - JSON.parse(localData).timestamp > HOUR) {
        const data = await processTreeData();
        setTreeData(data);

        localStorage.setItem('treeData', JSON.stringify({ timestamp: getCurrentTimestamp(), data }));
      }
    })();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Ecologi Developer Challenge: Sam Vargas</title>
        <meta name="description" content="Ecologi hiring developer challenge. Task completed by Sam Vargas" />
        {/* In a realworld app we'd have check we have icons for all devices
            using something like https://realfavicongenerator.net/
        */}
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <img src="/image/logo.svg" alt="Ecologi" width="125" height="64" />
          <br />
          Developer Challenge
        </h1>
        <h2>Sam Vargas</h2>

        {typeof treeData === 'undefined' && (
          <img className={styles.loader} src="/image/wind-turbine.svg" alt="Loading..." width="250" height="288" />
        )}

        {typeof window !== 'undefined' && !!treeData && (
          <BasicBarChart
            width={window.innerWidth - 100 ?? 1000}
            height={window.innerHeight - 200 ?? 800}
            data={treeData}
          />
        )}
      </main>

      <footer className={styles.footer}>
        <a href="https://samvargas.xyz" target="_blank" rel="noopener noreferrer">
          Sam Vargas &#169; {new Date().getFullYear()}
        </a>
      </footer>
    </div>
  );
};

export default Home;
