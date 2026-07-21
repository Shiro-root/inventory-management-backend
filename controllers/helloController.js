import express from 'express';

export const handleHome = (req, res) => {
    res.send("ini adalah halaman home");
};

export const handleAbout = (req, res) => {
    res.send('ini adalah halaman about');
};

export const handleContact  = (req, res) => {
    res.send('ini adalah halaman contact')
}