FROM golang:latest AS builder

ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

WORKDIR /app

COPY go.mod .
RUN go mod download

COPY . .

RUN go build -o main ./cmd/main.go

FROM scratch
WORKDIR /root/
COPY --from=builder /app/main .

COPY cmd/.env /root/.env

EXPOSE 8081

CMD ["./main"]


