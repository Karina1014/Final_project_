FROM golang:1.22 AS builder 

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod tidy && go mod download

COPY . .

RUN go build -o main ./cmd/main.go

FROM scratch
COPY --from=builder /app/main .
CMD ["/main"]

