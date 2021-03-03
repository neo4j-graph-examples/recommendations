# recommendations-graphql

Try it live on Codesandbox [here](https://codesandbox.io/s/github/johnymontana/recommendations/tree/master/graphql?file=/schema.graphql)

## Example GraphQL Queries

```GraphQL
{
  businesses(
    where: {
      location_LT: {
        point: { latitude: 46.870036, longitude: -113.990976 }
        distance: 100
      }
    }
    options: { limit: 10 }
  ) {
    name
    reviews {
      text
    }
    recommended(first: 2) {
      name
      in_category {
        name
      }
    }
    location {
      latitude
      longitude
    }
  }
}

```


![](img/playground1.png)
