from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):
    @classmethod
    def setUpClass(cls):
        print('START OF TESTS')

    @classmethod
    def tearDownClass(cls):
        print('END OF TESTS')

    def test_home_page(self):
        with app.test_client() as client:
            res = client.get('/')
            self.assertEqual(res.status_code, 200)

    def test_game_page(self):
        with app.test_client() as client:
            res = client.get('/')
            self.assertEqual(res.status_code, 200)

    def test_word_check_route(self):
        with app.test_client() as client:
            res = client.post('/word-check', data={'guess-input': 'submit'})
            self.assertEqual(res.status_code, 200)

    # TODO -- write tests for every view function / feature!
