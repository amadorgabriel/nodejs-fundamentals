import http from "node:http"

const server = http.createServer(async (req, res) => {
    const buffers = []

    for await (const chunk of req) {
        // console.log(chunk.toString())
        buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers).toString()

    console.log(fullStreamContent)

    return res.end(fullStreamContent)

})

server.listen(3334)