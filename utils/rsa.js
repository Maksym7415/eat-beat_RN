import bigInt, { one, randBetween, lcm, gcd } from 'big-integer';

class RSA {
    constructor(exp, privateKey, publicKey) {
        this.privateKey = privateKey;
        this.publicKey = publicKey;
        this.exp = exp;
    }
  randomPrime(bits) {
    const min = one.shiftLeft(bits - 1);
    const max = one.shiftLeft(bits).prev();
    
    while (true) {
      let p = randBetween(min, max);
      if (p.isProbablePrime(256)) {
        return p;
      } 
    }
  }

  generate(keysize) {
    const e = bigInt(65537);
    let p;
    let q;
    let totient;
  
    do {
      p = this.randomPrime(keysize / 2);
      q = this.randomPrime(keysize / 2);
      totient = lcm(
        p.prev(),
        q.prev()
      );
    } while (gcd(e, totient).notEquals(1) || p.minus(q).abs().shiftRight(keysize / 2 - 100).isZero());

    return {
      exponent: e, 
      public_key: p.multiply(q),
      private_key: e.modInv(totient),
    };
  }

  encrypt(encodedMsg, pbk, exp) {
    return bigInt(encodedMsg).modPow(exp || this.exp, pbk || this.publicKey);
  }

  decrypt(encryptedMsg, prk, pbk) {
    return bigInt(encryptedMsg).modPow(prk || this.privateKey, pbk || this.publicKey); 
  }

  encode(str) {
    const codes = str
      .split('')
      .map(i => i.charCodeAt())
      .join('');

    return bigInt(codes);
  }

  decode(code) {
    const stringified = code.toString();
    let string = '';

    for (let i = 0; i < stringified.length; i += 2) {
      let num = Number(stringified.substr(i, 2));
      
      if (num <= 30) {
        string += String.fromCharCode(Number(stringified.substr(i, 3)));
        i++;
      } else {
        string += String.fromCharCode(num);
      }
    }

    return string;
  }
}

export default RSA;