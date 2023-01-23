import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { Gallery } from "react-grid-gallery";
import "./index.css";
import Title from "./component/Title";
import Modal from "./component/Model";
import Loader from "./component/Loader";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(30);
  const [hasMore, setHasMore] = useState(true);
  const [selectId, setSelectId] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/random?client_id=${process.env.REACT_APP_ACCESS_Key}&count=${page}`
      );
      if (response.data.length === 0) {
        setHasMore(false);
      }
      const data = response.data.map((item) => ({
        ...item,
        src: item.urls.full,
      }));
      setPhotos([...photos, ...data]);
      setPage(page + 10);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleSelect = (id) => {
    setSelectId(id);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={photos.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<Loader />}
      >
        <Title />
        <div className="container">
          <Gallery
            images={photos}
            onClick={handleSelect}
            enableImageSelection={false}
          />
        </div>
      </InfiniteScroll>
      {selectId && (
        <Modal
          images={photos}
          initialIndex={selectId}
          setSelectedImg={setSelectId}
        />
      )}
    </>
  );
};

export default App;
