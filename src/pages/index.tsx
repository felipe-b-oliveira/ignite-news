import { GetServerSideProps } from 'next';
import React from "react";
import Head from 'next/head';

import styles from './home.module.scss';
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from '../services/stripe';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News aboout the <span>React</span> world.</h1>
          <p>
            Get acess to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

/**
* Author: Felipe Oliveira
* Annotation I: NextJS/SSR -> In NextJS we have a different way of consuming api data. We have to be inside a page
* and if we need this call inside a component we should pass the api data from Page to Component.
* 
* Annotation II: About NextJS -> The downside of NextJS Server Side Rendering is that all Page need to await the api 
* response to be displayed.
* 
* Annotation III: All code inside 'getServerSideProps' is executed inside the NextJS Node instance.
*/
export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1NOojvKpzx2KkwiDV8F7oExD', {
    expand: ['product']
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    }
  }
}