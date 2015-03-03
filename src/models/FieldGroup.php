<?php
/**
 * @link http://buildwithcraft.com/
 * @copyright Copyright (c) 2013 Pixel & Tonic, Inc.
 * @license http://buildwithcraft.com/license
 */

namespace craft\app\models;

use Craft;
use craft\app\base\Model;
use craft\app\enums\AttributeType;

/**
 * FieldGroup model class.
 *
 * @author Pixel & Tonic, Inc. <support@pixelandtonic.com>
 * @since 3.0
 */
class FieldGroup extends Model
{
	// Public Methods
	// =========================================================================

	/**
	 * Use the group name as the string representation.
	 *
	 * @return string
	 */
	public function __toString()
	{
		return $this->name;
	}

	/**
	 * Returns the group's fields.
	 *
	 * @return array
	 */
	public function getFields()
	{
		return Craft::$app->fields->getFieldsByGroupId($this->id);
	}

	// Protected Methods
	// =========================================================================

	/**
	 * @inheritDoc Model::defineAttributes()
	 *
	 * @return array
	 */
	protected function defineAttributes()
	{
		return [
			'id'   => AttributeType::Number,
			'name' => AttributeType::Name,
		];
	}
}
