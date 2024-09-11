//프로필 사진 등록/수정용
package com.votetherum.dto;

public class UpdateProfilePhotoRequestDto {
    private String photoUrl; // 프로필 사진 URL

    // 생성자, getter, setter
    public UpdateProfilePhotoRequestDto() {}

    public UpdateProfilePhotoRequestDto(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }
}
