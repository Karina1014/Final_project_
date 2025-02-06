import requests

class GraphQLClient:
    def __init__(self, url):
        self.url = url

    def execute_query(self, query):
        response = requests.post(self.url, json={"query": query})

        print("Response Status Code:", response.status_code)
        print("Response Content:", response.json())

        if response.status_code == 200:
            if "data" in response.json():
                return response.json()["data"]
            else:
                raise Exception(f"No 'data' in response: {response.json()}")
        else:
            raise Exception(f"Failed to fetch data: {response.status_code}, {response.text}")
