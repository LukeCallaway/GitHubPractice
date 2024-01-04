words = ['hello', 'goodbye', 'baffle', 'raffle', 'waffle', 'hi', 'hellen', 'helium', 'hendricks']

def print_upper_words(words, letter):
    """converts all words that start with 1 or multiple letter(s) in a list to uppercase"""
    for word in words:
        if word[0] == letter:
           print(word.upper())

print_upper_words(words, 'h')