build:
	docker rmi ghcr.io/jennifergoldwin/rizq-nasional_website:latest && docker build -t ghcr.io/jennifergoldwin/rizq-nasional_website:latest .

push:
	docker push ghcr.io/jennifergoldwin/rizq-nasional_website:latest

PHONY:
	build push