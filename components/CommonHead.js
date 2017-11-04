import Head from 'next/head'
import stylesheet from './../styles/index.css'

export default() =>
  <Head>
    <meta charset="utf-8"></meta>
    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>

    <link href="https://fonts.googleapis.com/css?family=Questrial" rel="stylesheet"></link>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"></link>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css"></link>
    <title>libphonenumber.info</title>
  </Head>
