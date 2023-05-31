import { Readable } from "node:stream"

class OnetoOneHundredStream extends Readable { 
    index = 1

    _read(){
        setTimeout(() => {
            const i = this.index++
            
            if(i > 5) {
                this.push(null) 
            }
            
            if(i <= 5) {
                const buf = new Buffer.from(String(i))
                this.push(buf)
            }
        }, 1000)
    }
}

fetch('http://localhost:3334', {
    method: 'POST',
    body: new OnetoOneHundredStream(),
    duplex: 'half'
})
.then(res => {
    return res.text()
})
.then(data => {
    console.log(data)
})