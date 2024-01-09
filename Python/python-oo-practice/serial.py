"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """
    def __init__(self,start):
        self.start = start
        self.next_num = start

    def __repr__(self):
        return f"SerialGenerator(start = {self.start})"

    def __str__(self):
        return 'Returns numbers starting at starting and incrementing by 1'

    def generate(self):
        """Returns a serial number starting at start"""
        self.next_num += 1
        return self.next_num - 1

    def reset(self):
        """Resets the serial number back to start"""
        self.next_num = self.start