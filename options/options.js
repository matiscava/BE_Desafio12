const options = {
    mongodb: {
      host: 'mongodb://localhost/Desafio22',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
      }
    },
    file: {
      path: './db'
    },
    firestore: {
        "type": "service_account",
        "project_id": "desafio22-da739",
        "private_key_id": "8981fadefde99736b755e772881ac53e089dd1fe",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC8JhzupplLGkVa\nTmmC3+Iiq8QgNWnIElbvtNIaXQKWaNCmfEy+lsiHZy4krGMA8PcHdWX2WlAUavd+\n/4WvtGz0mmJegC27xIIXLMAJ7RGKB5XPjHkxPxaL0myLiXCfAdJ87lBDPZi5ziVg\noMWr0qv9jreMW6dLtbBpG+0CkxPUIYOWTiFxtu2wykvZw0ESnf+1m8nnrKsy2t4X\nAmEsvxw8Na9I7UE1mK11/PE8sZaNMs2LHl1ZcnWIIYzUaqRlctvDBNGjSJo0isJ3\nJk+1QCS4nl4woMO3B2o6Tt0GfM+A4D/pLboGR8aPgYxHminIP3t5ho587mv9RmDs\nCyr5bNxJAgMBAAECggEANkqNKLQ8IbbH8mIUAibWWwjThDPFfW0FVxAHXIIgQASo\nyJGvl4NtA91bLEvuGZRuw+E1ddvjpbCkECptiiD3G7H81qYIDFmM7GEGXRbia8D6\nkrRHOFWrDNfAaJdVPxzIfzJJSM3aZys8D+D0iTs2U+k9v6um36ri58GeJ5MHMrum\nToQ/J3xEhRVZDd5wjqWXvu2jojGMiqBbNiLRlY7NA5ZtqYK/MruWGR3zgHnOVJea\ni7v5ZbeLvbJLvC9s8K/Y1aVpgqPcMHCcoTnSEPin/DdIezHYStfLeFfWKIBST+CX\n40MG591Ol9cRhLba91ltQD9UF2U9xEssq2djbNL4/QKBgQDfORy6EOz+ZJCDv5g1\nMy0J+tEsi+xRc7tmz8mb4XN5AX9zZ1t8v6jPdHHPLfHvKYsvTO6/vFgn6EeM47J2\nQUZx1nTE7prA0NTcFWyBABE/qIw/LOcCjXGczYh8ScFSpnN+mmqmYLI2a/vi48ZI\ngVRQiVbmeiKozI92GWHIEq/18wKBgQDXxpJf3l3hsC926tX1wIU/JdZsyiFf4GKL\nX8cTj315NHcbaA4OMNVBbS0fgcFxgZmGLtPw0Rzvzx9ilB+hB3NeP5iMfshswBA0\nd0VRGZCC6DNN/s6mM2X8NQ1VIaGiZwW6Os87FPN2s1hEVqaoKUfVpTkyAwWF5o8h\n211/7AaH0wKBgQC4BrCNINkQ3L1bMD/+U+Nkn9eEfxJjECNGHjWagiIdd0OoU2RU\nEvnLlbch00HqJnitlSIbBd4zgEZEe48r+KJnxSJdHEyOe1uQ2USrkO+naH++sXj9\nXLh2Seekd3WeesUqcYlNAtjJDvsI0Tktmxl0j9UJi1U5jfMTrNc1B1rzSwKBgQCq\nplInXd8T2dqACxPySzNWkN83pNimUfi9z57LWoVacWLtmura0EYoe2bfbyiFU4EO\nvURDRa7D/iQNO6aUHSdh15wXKUHruC5YwCdjD3vZ/DhvK+FVUnsK7w4/UNzbauz9\nrvsr99LhAtABJCKkBhnY3tYQNpGMp551oV8eB5XWnwKBgQDWivtU5WRHn7Wy1wkp\nqElXpE3pDYi2dqx4N4VbX02tl/dkipUjSOxNzVh5anZh/AocW/9YU4SLckTnodsz\n3SWb9dTvz9ZBl3HIBSN2lYbNDOorLJqJn3Qkl/em20YGOAJOGvKo2T2yO4EC8t8f\nne9qlAqjO25e9GwgOx395KEFKw==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-fbpfa@desafio22-da739.iam.gserviceaccount.com",
        "client_id": "109075202868228385176",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbpfa%40desafio22-da739.iam.gserviceaccount.com"
      }
  };
  
  module.exports = options;
  