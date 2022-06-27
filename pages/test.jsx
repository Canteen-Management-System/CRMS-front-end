import React from "react";
import http from "../lib/services/httpService";

export default function test() {
  const getCategories = async () => {
    const URL = "/category-list";
    const config = {
      headers: {
        authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU2MjUzMjg1LCJpYXQiOjE2NTYyNDk2ODUsImp0aSI6ImY2NmQ5ZjdlODQxZTQ0NjJiMzU3YjhkZWQ0ZGQwNTM4IiwidXNlcl9pZCI6MX0.crwVgmnajlcWFih8uN76txYRRQJP5SBkQ8ChdRDx03g`,
      },
    };
    try {
      const data = await http.get(URL, config);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  getCategories();
  return <div className="text-white ">Hello</div>;
}
