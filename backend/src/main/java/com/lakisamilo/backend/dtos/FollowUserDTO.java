package com.lakisamilo.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FollowUserDTO {
    
    private String username;
    private String targetUsername;

}
