import React from 'react'

const Newsitem =(props)=>{
    let { title, discription, imgurl, newsurl,auther,publish,sourse } = props;
    return (
          <div className="my-3">
            <div className="card">
            <span className="badge position-absolute top-0 translate-middle round-pill bg-danger" style={{left:"90%",zIndex:1}}>{sourse}</span>
              <img src={!imgurl?"https://img.atlasobscura.com/CHy46XuUoY87fCURh_3ULla7QSUaqu5JNWH3NZp1B3I/rt:fit/w:600/q:81/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL3BsYWNl/X2ltYWdlcy82ZDcx/NmExZC1lMTRiLTQ1/MTItOWFiNy0yMjNm/ZjY5NGU1MDgxYWJk/N2ZmYjJjYjc5YWEy/NmNfMjM3MTAyOTI4/MThfMmI5NDQzMmM1/M19rLmpwZw.jpg":imgurl} alt='wallpaper' className="card-img-top"/>
              <div className="card-body">
                <h5 className="card-title">{title} </h5>
                <p className="card-text">{discription}</p>
                <p className="card-text"><small>By {!auther ?"Unknown" :auther}  on {new Date(publish).toGMTString()}</small></p>
                <a href={newsurl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark">Read more</a>
              </div>
            </div>
          </div>
    )
}

export default Newsitem