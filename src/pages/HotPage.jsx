import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PostTable from '../components/PostTable';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Pagination from '../components/Pagination';
import axios from 'axios';

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 45px;
  font-weight: 550;
  padding: 20px;
  margin-top: 50px;
`;

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  width: 80%; 
  margin: auto;
  justify-content: flex-end;
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const SearchButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  background-color: #8C0327;
  color: #fff;
  cursor: pointer;
`;


function HotPage(){
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [clickSearch, setClickSearch] = useState(false);
  const postsPerPage = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchPosts = async (keyword = '', board = 'hot', page = 1) => {
    try {
      const endpoint = keyword ? 'search' : 'hot';
      const response = await axios.get(`http://localhost:3001/board/${endpoint}`, {
        params: {
          query: keyword,
          page: page,
          category: board
        }
      });
      setPosts(response.data.posts);
      setTotalPosts(response.data.total);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    if (clickSearch) {
      fetchPosts(searchKeyword, 'hot', currentPage);
    } else {
      fetchPosts('', 'hot', currentPage);
    }
  }, [currentPage, clickSearch]);

  const handleSearch = () => {
    setCurrentPage(1);
    setClickSearch(true);
    fetchPosts(searchKeyword, 'hot', 1);
  };

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <>
      <Header/>
        <Title>HOT 게시판</Title>

        <Wrapper>
        <SearchWrapper>
          <input 
            placeholder='검색...' 
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <SearchButton onClick={handleSearch}>검색</SearchButton>
        </SearchWrapper>
      </Wrapper>

      <PostTable postwhat={posts} currentPage={currentPage} postsPerPage={postsPerPage} />

      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
    </>
  );
};

export default HotPage;