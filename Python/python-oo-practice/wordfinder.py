"""Word Finder: finds random words from a dictionary."""
import random

class WordFinder:
    """A class to find a word from a different file"""

    def __init__(self,file_path):
        """Compiles words from another file into a list"""

        self.words = []
        self.file_path = file_path


        file = open(file_path, "r")
        for line in file:
            self.words.append(line)
        file.close()

        print(f'{len(self.words)} words read')

    def __repr__(self):
        return f"WordFinder(file_path = {file_path})"

    def random_word(self):
        """Takes the list of words and returns a random word"""

        words_length = len(self.words)
        random_idx = random.randint(0, words_length - 1)
        return self.words[random_idx].strip("\n")

class SpecialWordFinder(WordFinder):
    """Take WordFinder class a filters it down to only words and not empty lines, comments, etc"""
    
    def __init__(self, file_path):
        super().__init__(file_path)

        self.words = []
        file = open(file_path, "r")
        for line in file:
            self.words.append(line)
        file.close()

    def not_blank(self):
        """Checks to see if a line is blank or a comment"""
        for word in self.words:
            print ('\n')
            if word[:2] == "\n" or word[0] == "#":
                self.words.remove(word)

    def random_word(self):
        """returns the random word"""
        self.not_blank()
        words_length = len(self.words)
        random_idx = random.randint(0, words_length - 1)
        return self.words[random_idx].strip("\n")