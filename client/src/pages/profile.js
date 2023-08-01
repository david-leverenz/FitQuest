// Import the things necessary to render the page.
import React, { useState } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Card, Col, Container, Row, Form } from 'react-bootstrap';
import './profile.css'
import bluePotion from '../styles/img/icons/potion-blue.png'


// This imports the two queries in use on the page.
import { QUERY_ME, ADD_, QUERY_EXERCISES } from '../utils/queries';

// Auth function uses the token to identify the "me" user.
import Auth from '../utils/auth';

// This retrieves the exercise list.
const Profile = () => {

    const { loading, data } = useQuery(QUERY_EXERCISES, {
        fetchPolicy: "no-cache"
    });

    const exerciseList = data?.exercises || [];

    const { loading: userDataLoading, data: currentUserData } = useQuery(QUERY_ME, {
        fetchPolicy: "no-cache"
    });

    const userExerciseList = currentUserData?.exercises || [];

    const userInfo = currentUserData?.me || {};
    // console.log(userInfo.user_id.email);


    // This is the drop down functionality.
    const [selectedCategory, setSelectedCategory] = useState('All');

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const filteredCards = selectedCategory === 'All' ? exerciseList : exerciseList.filter(card => card.type === selectedCategory);


    return (

        <Container className="rpgui-container framed-golden">
            <div>
                {userDataLoading ? (<h2>Loading...</h2>) : (
                    <div className="row">
                        <div className="col text-info text-center" >Your Strength:{userInfo.strength} 25</div>
                        <div className="col text-warning text-center" >Your Stamina:{userInfo.strength} 25</div>
                        <div className="col text-danger text-center" >Your Agility:{userInfo.strength} 25</div>
                        {/* {userInfo.user_id.username}
                 {userInfo.user_id.email}
                 {userInfo.agility}
                 {userInfo.strength}
                 {userInfo.stamina} */}
                    </div>
                )}

                <h1>Choose an Excercise Quest to Complete</h1>
                <Form>
                    <Form.Group>
                        <Form.Label>Filter by Exercise Type:</Form.Label>
                        <Form.Control className=" rpgui-dropdown-imp" as="select" value={selectedCategory} onChange={handleCategoryChange}>
                            <option value="All">All</option>
                            <option value="Strength">Strength</option>
                            <option value="Stamina (Cardiovascular)">Stamina</option>
                            <option value="Agility">Agilty</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
                <Row className="flex-wrap overflow-auto">
                    {filteredCards.map((exercise, _id) => (
                        <Col xs={4} key={exercise._id}>
                            <Link to={{ pathname: `/profile` }}>
                                {/* <Link to={{ pathname: `/exercise/${exercise._id}` }}> */}
                                {/* =========================
This link will need to change.
========================= */}
                                <Card className="custom-card">
                                    {/* <Card.Img variant="top" src={card.image} alt={card.title} /> */}
                                    <Card.Body>
                                        <Card.Title className="custom-title">{exercise.exercise_name}</Card.Title>
                                        <div className="custom-type">Type: {exercise.type}</div><br></br>
                                        <div className="custom-description">{exercise.description}</div> <br></br>
                                        <div className="align-items-center">
                                            <img src={bluePotion} className="custom-icon" alt="Blue Potion" />
                                            <div className="custom-points">Potion: {exercise.points}p</div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </div>
        </Container >
    );
};

export default Profile;