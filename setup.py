from setuptools import setup, find_packages

setup(
    name = 'world-news',
    version = '1.0.0',
    packages = find_packages(),
    install_requires = [
        "Flask"
    ],
    author = 'Nevelina Aleksandrova',
    author_email = 'nevelina.aleksandrova@gmail.com',
    description = 'Map-based world news aggregator'
)
