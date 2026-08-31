package dto;

import java.time.LocalDateTime;

public class ErrorDetail {
// hata durumlarında istemciye dönen hata JSON nesnesidir
    private String message;
    private int statusCode;
    private LocalDateTime timestamp;

    public ErrorDetail() {
    }

    public ErrorDetail(String message, int statusCode, LocalDateTime timestamp) {
        this.message = message;
        this.statusCode = statusCode;
        this.timestamp = timestamp;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}