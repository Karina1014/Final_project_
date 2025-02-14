FROM golang:1.19 AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod tidy && go mod download  # Asegura que las dependencias estén actualizadas

COPY . .

RUN go build -o main ./cmd/main.go

FROM scratch
COPY --from=builder /app/main .
CMD ["/main"]


