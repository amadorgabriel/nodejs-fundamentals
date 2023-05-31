// process.stdin.pipe(process.stdout)

import { Readable, Writable, Transform } from 'node:stream'

class OnetoOneHundredStream extends Readable { 
    index = 1

    _read(){
        setTimeout(() => {
            const i = this.index++
            
            if(i > 10) {
                this.push(null) 
            }
            
            if(i <= 10) {
                const buf = new Buffer.from(String(i))
                this.push(buf)
            }
        }, 1000)
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, enconding, callback) {
        const transformed = Number(chunk.toString()) * -1

        callback(null, new Buffer.from(String(transformed)))
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback){
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

new OnetoOneHundredStream().pipe(new InverseNumberStream()).pipe(new MultiplyByTenStream())