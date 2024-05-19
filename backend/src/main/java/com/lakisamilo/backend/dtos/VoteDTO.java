package com.lakisamilo.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoteDTO {
    
    private String voter;
    private long postId;
    private String voteState;

}
