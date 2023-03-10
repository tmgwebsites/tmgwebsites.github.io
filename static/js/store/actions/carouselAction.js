import actionTypes from "../actionTypes";
import axios from "axios";

const bufferToBase64 = (data) => {
    let image = btoa(
        new Uint8Array(data.image.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
        )
    );
    // TODO: Find a way to not hard code data type
    const base64Image = `data:image/png;base64,${image}`;
    return { ...data,
        image: base64Image
    };
};

export const getCarousel = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.SET_CAROUSEL_LOADING
        });
        axios({
                method: "GET",
                url: "https://tmg-website-utsc.herokuapp.com/carousel",
            })
            .then((res) => {
                let slides = [];
                res.data.forEach((slide) => slides.push(bufferToBase64(slide)));
                dispatch({
                    type: actionTypes.SET_CAROUSEL,
                    slides: slides
                });
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    localStorage.removeItem("jwt");
                    dispatch({
                        type: actionTypes.API_UNAUTHORIZED
                    });
                }
            });
    };
};

export const uploadCarousel = (image, blurb, name, role) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.SET_CAROUSEL_LOADING
        });
        axios({
                method: "POST",
                url: "https://tmg-website-utsc.herokuapp.com/carousel/new",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
                data: {
                    image: image.image,
                    blurb: blurb,
                    name: name,
                    role: role
                },
            })
            .then((res) => {
                dispatch({
                    type: actionTypes.ADD_NEW_SLIDE,
                    newSlide: bufferToBase64(res.data),
                });
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    localStorage.removeItem("jwt");
                    dispatch({
                        type: actionTypes.API_UNAUTHORIZED
                    });
                }
            });
    };
};

export const editCarousel = (_id, image, blurb, name, role) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.SET_CAROUSEL_LOADING
        });
        axios({
                method: "POST",
                url: "https://tmg-website-utsc.herokuapp.com/carousel/update",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
                data: {
                    _id: _id,
                    image: image,
                    blurb: blurb,
                    name: name,
                    role: role,
                },
            })
            .then((res) => {
                dispatch({
                    type: actionTypes.UPDATE_SLIDE,
                    newSlide: bufferToBase64(res.data),
                });
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    localStorage.removeItem("jwt");
                    dispatch({
                        type: actionTypes.API_UNAUTHORIZED
                    });
                }
            });
    };
};

export const deleteCarousel = (_id) => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.SET_CAROUSEL_LOADING
        });
        axios({
                method: "DELETE",
                url: "https://tmg-website-utsc.herokuapp.com/carousel/delete",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
                data: {
                    _id: _id
                },
            })
            .then((res) => {
                dispatch({
                    type: actionTypes.DELETE_SLIDE,
                    deletedSlide: bufferToBase64(res.data),
                });
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    localStorage.removeItem("jwt");
                    dispatch({
                        type: actionTypes.API_UNAUTHORIZED
                    });
                }
            });
    };
};