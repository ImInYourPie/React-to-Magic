import axios from "axios";

export default () => {
    return axios.create({
        baseURL: "http://localhost:3000",
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDFjZDNjYzNiNjVjMTNjZjRhZjkzNjciLCJ1c2VyVHlwZSI6ImRlZmF1bHQiLCJ1c2VybmFtZSI6IlBpZSIsInJlYWxOYW1lIjoiTWlnYXMiLCJyZWdpc3RlckRhdGUiOiIyMDE5LTA3LTAzVDE2OjExOjU2LjQ4NFoiLCJpYXQiOjE1NjIxNzAzMzYsImV4cCI6MTU2Mjc3NTEzNn0.ZaDIiPHdZTDxczP-3P-LfOhOtuLp7WGLfKYpEgGfgCs`
          }
    })
}