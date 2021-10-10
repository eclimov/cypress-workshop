Feature: End to end cart validation

  Background:
    Given I open homepage


  Scenario: Item is added to cart
    When I add an item to cart
    And I click Proceed to Checkout
    Then I am on shopping-cart summary page
    Then List of items in cart is not empty

  Scenario: Remove all items from cart
    When I add an item to cart
    And I click Proceed to Checkout
    Then I am on shopping-cart summary page
    And I remove an item from cart
    Then List of items in cart is empty
