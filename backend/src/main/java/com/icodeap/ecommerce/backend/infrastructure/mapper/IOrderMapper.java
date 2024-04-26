package com.icodeap.ecommerce.backend.infrastructure.mapper;

import com.icodeap.ecommerce.backend.domain.model.Order;
import com.icodeap.ecommerce.backend.domain.model.OrderState;
import com.icodeap.ecommerce.backend.infrastructure.entity.OrderEntity;
import com.icodeap.ecommerce.backend.infrastructure.entity.OrderProductEntity;
import com.icodeap.ecommerce.backend.infrastructure.entity.UserEntity;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.time.LocalDateTime;
import java.util.List;

@Mapper(componentModel = "spring", uses = IOrderProductMapper.class)
public interface IOrderMapper {

    @Mappings(
            {
                    @Mapping(source = "id", target = "id"),
                    @Mapping(source = "dateCreated", target = "dateCreated"),
                    @Mapping(source = "orderProducts", target = "orderProducts"),
                    @Mapping(source = "orderState", target = "orderState"),
                    @Mapping(source = "userEntity.id", target = "userId"),
            }
    )

    Order toOrder (OrderEntity orderEntity);
    Iterable<Order> toOrderList (Iterable<OrderEntity>  orderEntities);
    @InheritInverseConfiguration
    OrderEntity toOrderEntity (Order order);
}
