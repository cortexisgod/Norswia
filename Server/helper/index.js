const fs = require('fs')
class DB {
    
    constructor(){

    }

   /*
  yaz => set
  db.set('prefix', '!')
 <DB>.yaz('prefix', '!')
*/
  
  yaz(veri, değer){
      if (!veri) throw new TypeError("Veri Girmediniz!")
      if (!değer) throw new TypeError("Değer Girmediniz")
      const dosya = JSON.parse(fs.readFileSync('serverDB.json', 'utf8'))
      dosya[veri] = değer
      return fs.writeFileSync('serverDB.json', JSON.stringify(dosya, null, 1))
  }

/*
bul => fetch/get 
db.fetch('prefix')
<DB>.bul('prefix')
*/


  bul(veri){  
    if (!veri) throw new TypeError("Veri Girmediniz!")
    const dosya = JSON.parse(fs.readFileSync('serverDB.json', 'utf8'))
    return dosya[veri]
   }

  
/*
kontrol => has 
db.has('prefix')
<DB>.kontrol('prefix')
*/

kontrol(veri){
    if (!veri) throw new TypeError("Veri Girmediniz!")
    const dosya = JSON.parse(fs.readFileSync('serverDB.json', 'utf8'))
    return dosya[veri] ? true : false 
    } 

    /*
    sil = delete
    db.delete('prefix')
    db.sil('prefix')
    */

    sil(veri){
        if (!veri) throw new TypeError("Veri Girmediniz!")
        const dosya = JSON.parse(fs.readFileSync('serverDB.json', 'utf8'))
        if (!dosya[veri]) throw new TypeError('Yazdığınız Veri Bulunamadı')
        delete dosya[veri]
        return fs.writeFileSync('serverDB.json', JSON.stringify(dosya, null, 2))
    }

    /*
    yedekle => backup
    db.backup('veri.json')
    <DB>.yedekle('veri.json')
    */

    yedekle(dosyaAdı){
        if (!dosyaAdı) throw new TypeError("dosya Adı Girmediniz!")
        const dosya = JSON.parse(fs.readFileSync('serverDB.json', 'utf8'))
        return fs.writeFileSync(`${dosyaAdı}.json`, JSON.stringify(dosya, null, 2))

    }
    /*
    topla => add
    db.add('puan', '5')
    <DB>.topla('puan', '5')
    */

    topla(veri, değer){
        if (!veri) throw new TypeError("Veri Girmediniz!")
        const dosya = JSON.parse(fs.readFileSync('serverDB.json', 'utf8'))
        dosya[veri] += değer
        return fs.writeFileSync('serverDB.json', JSON.stringify(dosya, null, 2))
   }

   /*
   çıkar => substr
   db.substr('puan', 5)
   <DB>.çıkar('puan', 5)
   */

   çıkar(veri, değer){
    if (!veri) throw new TypeError("Veri Girmediniz!")
    if (typeof değer !== 'number') throw new TypeError("Değer Olarak Lütfen Bir Sayı Girinz")
    if (!this.kontrol(veri)) throw new TypeError("Veri Olarak Girdiğiniz Değer Veritabanında Bulunmuyor")
    if (typeof this.bul(veri) !== 'number') throw new TypeError("Sayı Ekleceğiniz Değer Bir Sayı Olmalı")
    const dosya = JSON.parse(fs.readFileSync('serverDB.json', 'utf8'))
    dosya[veri] -= değer
    return fs.writeFileSync('serverDB.json', JSON.stringify(dosya, null, 2))

    }



/*
sıfırla => -
<DB>.sıfırla()
*/


sıfırla(){
    const dosya = JSON.parse(fs.readFileSync('serverDB.json', 'utf8'))
    return fs.writeFileSync('serverDB.json', JSON.stringify({}, null, 2))
  }
}


module.exports = new DB() 